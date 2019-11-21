import numeraljs from 'vue-numeral-filter';

export default (ctx, inject) => {
  const numeral = {
    item: ctx
  };

  inject("numeral", numeral);
};
