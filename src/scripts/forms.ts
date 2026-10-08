// Sends any <form data-collection="..."> to Firestore, then moves on to the
// form's action page. Uses the Firestore REST API, so no Firebase SDK ships
// to visitors. firestore.rules decides what a submission may contain.
import { site } from '../site';

const { projectId, apiKey } = site.firebase;
const endpoint = (collection: string) =>
  `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}?key=${apiKey}`;

for (const form of document.querySelectorAll<HTMLFormElement>('form[data-collection]')) {
  const status = form.querySelector<HTMLElement>('.form-status');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    // Bots fill the hidden field; people never see it. Pretend it worked.
    if (data.get('company-website')) {
      location.assign(form.action);
      return;
    }
    data.delete('company-website');

    const fields: Record<string, { stringValue: string } | { timestampValue: string }> = {};
    for (const [key, value] of data) fields[key] = { stringValue: String(value).trim() };
    fields.createdAt = { timestampValue: new Date().toISOString() };

    if (button) button.disabled = true;
    if (status) status.hidden = true;
    try {
      const res = await fetch(endpoint(form.dataset.collection!), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      });
      if (!res.ok) throw new Error(`Firestore answered ${res.status}`);
      location.assign(form.action);
    } catch (err) {
      console.error(err);
      if (status) status.hidden = false;
      if (button) button.disabled = false;
    }
  });
}
