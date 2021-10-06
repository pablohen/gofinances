import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface Props {}

const Profile = (props: Props) => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Pablo Henrique"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="de Souza"
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};

export default Profile;
