import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
/*
import Chat from "@/views/Chat.vue";
import CreateMessage from "@/components/CreateMessage.vue";
*/

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
/*

describe("CreateMessage.vue", () => {
  it("warning msg is shown when empty msg is input ", () => {
    const name = "jest tester";
    console.log('calvin: 1');
    const wrapper = shallowMount(CreateMessage, {
      propsData: { name }
    });
    console.log('calvin: 2');
    wrapper.find('.btn').trigger('click');
    console.log('calvin: 3');
    console.log(wrapper.vm.createMessage);
    console.log(wrapper.find('.text-danger').exists());
    expect(wrapper.find('text-danger').text()).toMatch("A message must be entered first!");
    console.log('calvin: 4');
  });
});
describe("Chat.vue", () => {
  it("warning msg is shown when empty msg is input ", () => {
    const name = "jest tester";
    console.log('calvin: 1');
    const wrapper = shallowMount(Chat, {
      propsData: { name }
    });
    console.log('calvin: 2');
    wrapper.find('button').trigger('click');
    console.log('calvin: 3');
    expect(wrapper.text()).toMatch("A message must be entered first!");
  });
});
 */
