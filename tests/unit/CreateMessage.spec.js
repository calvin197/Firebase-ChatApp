import { shallowMount, mount } from "@vue/test-utils";
import CreateMessage from "@/components/CreateMessage.vue";

const wrapper = shallowMount(CreateMessage);

// helper function that mounts and returns the rendered component
const getMountedComponent = (Component, propsData) => {
  return shallowMount(Component, {
    propsData
  });
}

describe("CreateMessage", () => {
  it("has a createMessage method", () => {
    expect(typeof CreateMessage.methods.createMessage).toBe("function");
  });
  it("sets the correct default data", () => {
    expect(typeof CreateMessage.data).toBe("function");
    const defaultData = CreateMessage.data();
    expect(defaultData.newMessage).toBe(null);
    expect(defaultData.errorText).toBe(null);
  });
  it("correctly sets the message when created", () => {
    expect(wrapper.vm.$data.newMessage).toBe(null);
    expect(wrapper.vm.$data.errorText).toBe(null);
  });
  it("renders the correct message", () => {
    expect(wrapper.text()).toBe("Submit");
  });
  it("renders correctly with different props", () => {
    let status = ["Admin", "Facebook", "Google", "Email"];
    let room = ["messages", "sports", "news"];
    for (let i = 0; i < status.length; i++) {
      for (let j = 0; j < room.length; j++) {
        expect(
          getMountedComponent(CreateMessage, {
            name: "Calvin",
            status: status[i],
            room: room[j]
          }).text()
        ).toBe("Submit");
      }
    }
  });
});

