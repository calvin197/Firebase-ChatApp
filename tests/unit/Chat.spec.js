import { shallowMount, mount } from "@vue/test-utils";
import Chat from "@/views/Chat.vue";

const ChatWrapper = shallowMount(Chat);

describe("Chat", () => {

  it("sets the correct default data", () => {
    expect(typeof Chat.data).toBe("function");
    const defaultData = Chat.data();
    expect(defaultData.room).toBe("messages");
    expect(defaultData.rooms).toStrictEqual(["messages", "sports", "news"]);
  });
  it("correctly sets room and rooms when created", () => {
    expect(ChatWrapper.vm.$data.room).toBe("messages");
    expect(ChatWrapper.vm.$data.rooms).toStrictEqual(["messages", "sports", "news"]);
  });
  it("renders the correct message", () => {
    expect(ChatWrapper.text().split('\n')[0]).toBe("Real-Time Chat ");
    expect(ChatWrapper.text().split('\n')[1]).toBe("    Welcome to MESSAGES, !");
  });
  it("renders correctly with different props", async() => {
    let status = ["Admin", "Facebook", "Google", "Email"];
    let room = ["MESSAGES", "SPORTS", "NEWS"];
    for (let i = 0; i < status.length; i++) {
      for (let j = 0; j < room.length; j++) {
        let ChatWrapper1 = shallowMount(Chat, {
          name: "Calvin",
          status: status[i]
        });
        ChatWrapper1.setData({
          room: room[j]
        });
        await ChatWrapper1.vm.$nextTick()
        expect(ChatWrapper1.text().split('\n')[1]).toBe(`    Welcome to ${room[j]}, !`);
      }
    }
  });
  /*
  */
});