type TemplateRecord = {
  key?: string;
  subject?: string;
  htmlBody?: string;
  textBody?: string;
};

type RenderedTemplate = {
  subject: string;
  html: string;
  text: string;
};

function interpolate(template: string | undefined, context: Record<string, unknown>): string {
  if (!template) return '';
  return template.replace(/{{\s*([\w.]+)\s*}}/g, (_match, key: string) => {
    const value = (context as any)[key];
    return value != null ? String(value) : '';
  });
}

async function getTemplate(key: string): Promise<TemplateRecord | null> {
  const doc = await strapi
    .documents('api::email-template.email-template')
    .findFirst({ filters: { key } });
  return (doc ?? null) as unknown as TemplateRecord | null;
}

export async function renderEmailTemplate(
  key: string,
  context: Record<string, unknown>
): Promise<RenderedTemplate> {
  try {
    const tpl = await getTemplate(key);
    if (!tpl) {
      return {
        subject: (context.subject as string) || key,
        html: '',
        text: '',
      };
    }

    const subject = interpolate(tpl.subject || key, context);
    const html = interpolate(tpl.htmlBody || '', context);
    const text = interpolate(tpl.textBody || '', context);

    return { subject, html, text };
  } catch (err) {
    console.error('[email-template] Failed to render template', key, err);
    return {
      subject: (context.subject as string) || key,
      html: '',
      text: '',
    };
  }
}
