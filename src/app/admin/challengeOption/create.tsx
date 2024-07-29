import {
  BooleanInput,
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

export const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" label="Question" validate={[required()]} />
        <BooleanInput
          source="correct"
          label="Correct Option"
          validate={[required()]}
        />

        <TextInput
          source="image"
          label="Image URL"
          format={value => (value === '' ? undefined : value)}
        />
        <TextInput source="audio" label="Audio URL" validate={[required()]} />
        <ReferenceInput source="challengeId" reference="challenges" />
      </SimpleForm>
    </Create>
  );
};
