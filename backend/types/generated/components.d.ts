import type { Schema, Struct } from '@strapi/strapi';

export interface AboutDetailItem extends Struct.ComponentSchema {
  collectionName: 'components_about_detail_items';
  info: {
    description: 'Heading and body for About Us details section';
    displayName: 'Detail Item';
    icon: 'file-alt';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventDetailBlock extends Struct.ComponentSchema {
  collectionName: 'components_event_detail_blocks';
  info: {
    description: 'Header, description and image for event detail sections';
    displayName: 'Detail Block';
    icon: 'file-image';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    header: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface HomeAboutUsTextLine extends Struct.ComponentSchema {
  collectionName: 'components_home_about_us_text_lines';
  info: {
    description: 'Single paragraph line for home About Us section';
    displayName: 'Text Line';
    icon: 'file-alt';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface HomePartnerWithUsItem extends Struct.ComponentSchema {
  collectionName: 'components_home_partner_with_us_items';
  info: {
    description: 'Item with icon, title and subtitle for Partner With Us';
    displayName: 'Partner Item';
    icon: 'star';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface OurStoryDetailItem extends Struct.ComponentSchema {
  collectionName: 'components_our_story_detail_items';
  info: {
    description: 'A single detail line (string)';
    displayName: 'Our Story Detail';
    icon: 'file-alt';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface OurStoryItem extends Struct.ComponentSchema {
  collectionName: 'components_our_story_items';
  info: {
    description: 'Item with title, details list and background image';
    displayName: 'Our Story Item';
    icon: 'file-alt';
  };
  attributes: {
    details: Schema.Attribute.Component<'our-story.detail-item', true>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface WhatWeDoItem extends Struct.ComponentSchema {
  collectionName: 'components_what_we_do_items';
  info: {
    description: 'Single item with title, description, points and link';
    displayName: 'What We Do Item';
    icon: 'file-alt';
  };
  attributes: {
    description: Schema.Attribute.Text;
    item_title: Schema.Attribute.String;
    link: Schema.Attribute.String;
    points: Schema.Attribute.Component<'what-we-do.point', true>;
    title: Schema.Attribute.String;
  };
}

export interface WhatWeDoPoint extends Struct.ComponentSchema {
  collectionName: 'components_what_we_do_points';
  info: {
    description: 'A point (text only)';
    displayName: 'Point';
    icon: 'bullet-list';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.detail-item': AboutDetailItem;
      'event.detail-block': EventDetailBlock;
      'home-about-us.text-line': HomeAboutUsTextLine;
      'home-partner-with-us.item': HomePartnerWithUsItem;
      'our-story.detail-item': OurStoryDetailItem;
      'our-story.item': OurStoryItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'what-we-do.item': WhatWeDoItem;
      'what-we-do.point': WhatWeDoPoint;
    }
  }
}
