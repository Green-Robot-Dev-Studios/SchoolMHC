<script>
  import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";

  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input
  } from 'sveltestrap';

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";

  import { pop, push } from 'svelte-spa-router';

  let email, pass;

  let open = false, error;
  const toggle = () => (open = !open);

  function signOut(auth) {
    auth.signOut();
  }

  async function signIn(auth) {
    try {
      var res = await auth.signInWithEmailAndPassword(email, pass);
    } catch (err) {
      error = err;
      open = true;
    }
  }
</script>

<FirebaseApp {firebase}>
  <User let:user let:auth>
    <!-- Prompt user with sign in page -->
    <div slot="signed-out" class="text-center" style="display: flex; height: 100%;">
      <Modal isOpen={open} {toggle}>
        <ModalHeader>Warning!</ModalHeader>
        <ModalBody>
          {error}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" on:click={toggle}>Ok</Button>
          <Button color="secondary" on:click={toggle}>Close</Button>
        </ModalFooter>
      </Modal>

      <div id="form">
        <img src="./favicon.png" alt="School Icon"/>
        <h3>Please Sign In</h3>
        <Input 
          style="border-bottom-left-radius: 0; border-bottom-right-radius: 0; margin-bottom: -1px;"
          type="email"
          name="email"
          placeholder="Email 📧"
          bind:value={email} />
        <Input 
          style="border-top-left-radius: 0; border-top-right-radius: 0; margin-bottom: 15px;"
          type="password"
          name="pass"
          placeholder="Password 🙈" 
          bind:value={pass} />
        <Button style="width: 100%" color="primary" on:click={()=>signIn(auth)}>Sign In</Button>
      </div>
    </div>

    <!-- User most likely made a mistake, offer to take them back -->
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
    {:else}
      {push("/dash")}
    {/if}

    <!-- Redirect to control page -->
    
  </User>
</FirebaseApp>

<style>
  #form {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
</style>