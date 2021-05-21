<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";

  import { Column, Table } from 'sveltestrap';
</script>

<FirebaseApp {firebase}>
  <User let:user let:auth>
    <Collection 
      path="/users" 
      query={ref => ref.orderBy("timeCreated")}
      let:data={threads}
      let:ref={threadsRef}>

      <Table rows={threads} let:row striped>
        <Column header="Time Created" width="8rem">
          {row.timeCreated ? row.timeCreated.toDate().toLocaleString() : "..."}
        </Column>
        <Column header="Is Chatting" width="8rem">
          {row.isChatting ? "✅" : "❌"}
        </Column>
        <Column header="Is Finished" width="8rem">
          {row.isFinished ? "✅" : "❌"}
        </Column>
        <Column header="Link" width="8rem">
          <a href="#/chat/1/{row.id}">Link</a>
        </Column>
      </Table>
    </Collection>
  </User>
</FirebaseApp>

<style>
  a {
    color: black;
    text-decoration: underline;
  }
</style>