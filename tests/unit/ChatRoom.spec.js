import { shallowMount, mount } from "@vue/test-utils";
import ChatRoom from "@/components/ChatRoom.vue";

describe("ChatRoom", () => {
    it("has the correct methods", () => {
      expect(typeof ChatRoom.methods.deleteMessage).toBe("function");
      expect(typeof ChatRoom.methods.editMessage).toBe("function");
      expect(typeof ChatRoom.methods.isEditable).toBe("function");
      expect(typeof ChatRoom.methods.onClickUpdate).toBe("function");
      expect(typeof ChatRoom.methods.format).toBe("function");
      expect(typeof ChatRoom.methods.editableMessage).toBe("function");
      expect(typeof ChatRoom.methods.messageIcon).toBe("function");
    });
  
    it("sets the correct default data", () => {
      expect(typeof ChatRoom.data).toBe("function");
      const defaultData = ChatRoom.data();
      expect(defaultData.messages).toStrictEqual([]);
    });
  
    it("computes activeMessages correctly", () => {
      let chatRoomWrapper = shallowMount(ChatRoom, {
        propsData: { name: "Calvin", status: "Facebook", room: "messages" }
      });
      chatRoomWrapper.setData({
        messages: [
          {
            hide: true
          },
          {
            hide: false
          }
        ]
      });
      expect(chatRoomWrapper.vm.activeMessages.length).toBe(1);
    });
  
    it("computes editability based on user's status and name", ()=>{
      let doc = {
        status: "Email",
        name: "Calvin"
      }
      let doc1 = {
        status: "Guest",
        name: "Calvin"
      }
      expect(ChatRoom.methods.isEditable(doc, "Calvin", "Email")).toBe(true);
      expect(ChatRoom.methods.isEditable(doc, "Calvinn", "Email")).toBe(false);
      expect(ChatRoom.methods.isEditable(doc1, "Calvin", "Guest")).toBe(false);
    })
  });