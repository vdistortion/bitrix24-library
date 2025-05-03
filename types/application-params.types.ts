type ApplicationLabelType = {
  bgColor?: 'aqua' | 'green' | 'orange' | 'brown' | 'pink' | 'blue' | 'grey' | 'violet';
  text?: string;
  color?: string;
};

export type OpenApplicationParamsType = {
  bx24_width?: number;
  bx24_label?: ApplicationLabelType;
  bx24_title?: string;
  bx24_leftBoundary?: number;
};

export type OpenApplicationSettingsType = {
  width?: number;
  label?: ApplicationLabelType;
  title?: string;
  leftBoundary?: number;
};
