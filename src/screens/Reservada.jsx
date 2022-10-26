import { Text, View } from "react-native";

export const Reservada = ({ navigation, route }) => {
  const { mesa } = route.params;

  return (
    <View>
      <Text>Mesa reservada</Text>
    </View>
  );
};
