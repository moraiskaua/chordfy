import {
  BooleanInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" label="Id" validate={[required()]} />
        <TextInput source="text" label="Text" validate={[required()]} />
        <BooleanInput
          source="correct"
          label="Correct Option"
          validate={[required()]}
        />
        <TextInput source="question" label="Question" validate={[required()]} />
        <TextInput source="image" label="Image URL" validate={[required()]} />
        <TextInput source="audio" label="Audio URL" validate={[required()]} />
        <ReferenceInput source="challengeId" reference="challenges" />
      </SimpleForm>
    </Edit>
  );
};