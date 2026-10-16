import Loading from "./Loading.vue";

export default {
  title: "Util/Loading",
  component: Loading
};

const Template = (args, { argTypes }) => {
  return {
    components: { Loading },
    props: Object.keys(argTypes),
    template: "<Loading v-bind='$props' />"
  };
};

export const LoadingStatus = Template.bind({});

LoadingStatus.args = {
  loading: true,
  isBall: false
};
