<script>
  import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";

  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from 'sveltestrap';

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";

  import { pop } from 'svelte-spa-router'

  function signOut(auth) {
    auth.signOut();
  }
</script>

<FirebaseApp {firebase}>
  <User let:user let:auth>
    <!-- Prompt user with sign in page -->
    <div slot="signed-out">
      Sign In
    </div>

    {#if user.isAnonymous}
      <Modal isOpen={true}>
        <ModalHeader>Warning!</ModalHeader>
        <ModalBody>
          You are currently signed in to an anonymous chat session.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" on:click={()=>signOut(auth)}>Sign me out</Button>
          <Button color="secondary" on:click={pop}>Go back</Button>
        </ModalFooter>
      </Modal>
    {/if}
  </User>
</FirebaseApp>