import firebase from "@/firebase/init";
let fb = firebase.firestore;
//let ref = firestore.collection("messages").orderBy("timestamp");

const createMessage = async (
  message,
  name,
  timestamp,
  status,
  updatedBy
) => {
  await fb.collection("messages").add({
    message,
    name,
    timestamp,
    status,
    updatedBy
  })          
  .catch(err => {
    console.log(err);
  });

  return true;
};

describe("createFreeCourse", () => {
/*
  it("reads message in messages", async ()=>{

  })
*/
  it("creates a message in messages", async () => {
    //const set = ref.push().set;

    const result = createMessage(
      "firebase testing 123",
      "Jest test",
      Date.now(),
      "Admin",
      ""
    );
    await expect(result).resolves.toEqual(true);
  });
});
