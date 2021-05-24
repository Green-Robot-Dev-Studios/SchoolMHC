<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";

  import { Button, Column, Table } from 'sveltestrap';

  function remove(id, ref) {
    ref.doc(id).delete();
  }
</script>

<FirebaseApp {firebase}>
  <User let:user let:auth>
    <Collection 
      path="/users" 
      query={ref => ref.orderBy("timeCreated")}
      let:data={threads}
      let:ref={threadsRef}>

      <!-- ID does not work with svelte reactiveness -->
      <!-- <Table rows={threads} let:row striped responsive>
        <Column header="Identifier" width="8rem">
          {row.name ? row.name : "No Name"}
        </Column>
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
        <Column header="Delete" width="8rem">
          <Button color="danger" on:click={()=>remove(row.id, threadsRef)}>Delete</Button>
        </Column>
      </Table> -->

      <Table striped responsive>
        <thead>
          <tr>
            <th>Identifier</th>
            <th>Time Created</th>
            <th>Is Chatting</th>
            <th>Is Finished</th>
            <th>Link</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {#each threads as row (row.id)}
            <tr>
              <th scope="row">{row.name ? row.name : "No Name"}</th>
              <td>{row.timeCreated ? row.timeCreated.toDate().toLocaleString() : "..."}</td>
              <td>{row.isChatting ? "✅" : "❌"}</td>
              <td>{row.isFinished ? "✅" : "❌"}</td>
              <td><a href="#/chat/1/{row.id}">Link</a></td>
              <td><Button color="danger" on:click={()=>remove(row.id, threadsRef)}>Delete</Button></td>
            </tr>
          {/each}
        </tbody>
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