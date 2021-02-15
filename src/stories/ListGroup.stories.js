import ListGroup from "../components/ListGroup.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "ListGroup",
  component: ListGroup
};

const Template = (args, { argTypes }) => ({
  components: { ListGroup },
  props: Object.keys(argTypes),
  template: '<ListGroup :ListActions="ListActions"/>'
});

export const Bouton = Template.bind({});
Bouton.args = {
  listAction: [
    {
      name: "Mon profil",
      sourceimg: "../../public/img/icons/profilButton.png",
      dest: "/profile/username"
    },
    {
      name: "Rechercher un utilisateur",
      sourceimg: "../../public/img/icons/searchButton.png",
      dest: "/searchuser"
    },
    {
      name: "Proposer une oeuvre",
      sourceimg: "../../public/img/icons/requestArt.png",
      dest: "/contrib"
    }
  ]
};
