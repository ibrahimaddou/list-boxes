export interface ConfigParameter {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  label: string;
  required: boolean;
  options?: string[];
  defaultValue?: any;
}

export interface Config {
  id: string;
  name: string;
  title: string;
  icon: string;
  parameters: ConfigParameter[];
}