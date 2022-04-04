import { useState } from "react";

import { View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Modal from "../Modal";

import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { onReload } = props;

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm onClose={onCloseModal} onReload={onReload} />
        );
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm onClose={onCloseModal} onReload={onReload} />
        );
        break;
      case "password":
        setRenderComponent(<ChangePasswordForm onClose={onCloseModal} />);
        break;

      default:
        setRenderComponent(<Text>No selection </Text>);
    }

    setShowModal(true);
  };

  const menuOptions = generateOptions(selectedComponent);

  return (
    <View>
      {menuOptions.map((menu, index) => {
        return (
          <ListItem key={index} bottomDivider onPress={menu.onPress}>
            <Icon
              type={menu.iconType}
              name={menu.iconNameLeft}
              color={menu.iconColorLeft}
            />
            <ListItem.Content>
              <ListItem.Title>{menu.title}</ListItem.Title>
            </ListItem.Content>
            <Icon
              type={menu.iconType}
              name={menu.iconNameRight}
              color={menu.iconColorRight}
            />
          </ListItem>
        );
      })}

      <Modal show={showModal} close={onCloseModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Change name and lastname",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Change Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Change password",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];
}
