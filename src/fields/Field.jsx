import React from 'react';
import configureComponent from './configure';
import ConfiguredField from './ConfiguredField';

const Field = (props) => {
  const { path, id, schema, data, uiSchema } = props;
  const { type } = schema;
  const htmlId = `${id}_${path}`;
  const {
    Component, LabelComponent, componentProps, labelComponentProps, className, title,
  } = configureComponent({ ...props, htmlId });

  const helpText = uiSchema['ui:help'];
  return (
    <ConfiguredField
      id={id}
      className={className}
      data={data}
      type={type}
      Component={Component}
      componentProps={componentProps}
      LabelComponent={LabelComponent}
      labelComponentProps={labelComponentProps}
      title={title}
      helpText={helpText}
    />
  );
};

export default Field;
