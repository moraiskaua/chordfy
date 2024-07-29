import {
  BooleanField,
  Datagrid,
  List,
  ReferenceField,
  TextField,
} from 'react-admin';

export const ChallengeOptionList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <TextField source="question" />
        <TextField source="image" />
        <TextField source="audio" />
        <ReferenceField source="challengeId" reference="challenges" />
      </Datagrid>
    </List>
  );
};
