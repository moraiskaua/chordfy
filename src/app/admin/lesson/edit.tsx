import {
  Datagrid,
  Edit,
  List,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} />
        <TextInput source="title" validate={[required()]} />
        <ReferenceInput source="unitId" reference="units" />
        <NumberInput source="order" validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};
