<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";

  import { Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, 
    Jumbotron, 
    Button, 
    Row, 
    Card, 
    Container, 
    InputGroup, 
    Input, 
    CardFooter, 
    CardBody } from 'sveltestrap';

  import { strings } from "../locale"

  import { pop } from 'svelte-spa-router';
  
  import { tick } from 'svelte';

  // msgInput is synced to chat field's value
  // scrollRef is a reference to the chat
  let msgInput, scrollRef;

  // Sends message
  function send(msg, ref, person) {
    if (msg === "") {
      return;
    }
    ref.doc().set({
      person: person,
      text: msg,
      time: firebase.firestore.FieldValue.serverTimestamp()
    });
    msgInput = "";
  }

  // Auto scroll on update
  async function scroll() {
    // Awaits first tick in order to scroll on page load
    await tick()
    if (scrollRef) {
      scrollRef.scrollTo({
        top: scrollRef.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
    console.log("Scrolling");
  }

  // Signs out and redirects to homepage
  async function signOut(auth) {
    await auth.signOut();
  }

  function leave(auth) {
    setTimeout(async ()=>{
      await signOut(auth);
      window.location.href = '#/';
    }, 3000);
  }
</script>

<FirebaseApp {firebase}>
  <User let:user let:auth>
    <!-- Signed out content -->
    <div slot="signed-out">
      <Jumbotron>
        <Row>
          {@html strings.chat.warning}
        </Row>
        <Row class="d-block text-center">
          <Button on:click={() => auth.signInAnonymously()}>
            {@html strings.chat.matchMeNow}
          </Button>
        </Row>
      </Jumbotron>
    </div>

    <!-- Signed in content -->
    {#if user.isAnonymous}
      <Doc path={`users/${user.uid}`} let:ref={userRef} log>
        <!-- Firebase is still loading -->
        <div slot="loading">Loading...</div>

        <!-- Creates anon account -->
        <div slot="fallback">
          Creating account...
          {userRef.set({
            isFinished: false, 
            timeCreated: firebase.firestore.FieldValue.serverTimestamp() 
          })}
        </div>

        <!-- Renders messages -->
        <Collection 
          path={userRef.collection('messages')}
          query={ref => ref.orderBy("time")}
          let:data={messages}
          let:ref={messagesRef}
          on:data={scroll}
          log>
        
          <div slot="loading">Loading...</div>
          <div slot="fallback">There was an error getting messages. Try refreshing.</div>

          <div id="chat">

            <Container class="text-center" id="leaveButton">
              <Button color="danger" on:click={()=>leave(auth)}>Leave Chat</Button>
            </Container>

            <div id="messages" bind:this={scrollRef}>
              {#each messages as msg}
                <Card style="
                  border-bottom-{msg.person===1?'left':'right'}-radius: 0rem !important;
                  margin-left: {msg.person===1?'0':'auto'};
                "
                color="{msg.person===1?'primary':'secondary'}" 
                inverse 
                class="msg">
                  <CardBody>
                    {msg.text}
                  </CardBody>
                  <CardFooter>{msg.time ? msg.time.toDate().toLocaleTimeString() : '...'}</CardFooter>
                </Card>
              {/each}
            </div>

            <Container id="sendbox">
              <InputGroup>
                <Input 
                  on:keyup={e=>e.key==="Enter" && send(msgInput, messagesRef, 0)} 
                  bind:value={msgInput} placeholder="Message">
                </Input>
                <div class="input-group-append">
                  <Button on:click={()=>send(msgInput, messagesRef, 0)}>Send</Button>
                </div>
              </InputGroup>
            </Container>

          </div>
        </Collection>
      </Doc>
    {:else}
      <Modal isOpen={true}>
        <ModalHeader>Warning!</ModalHeader>
        <ModalBody>
          You are currently signed in as a helper.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" on:click={()=>signOut(auth)}>Sign me out</Button>
          <Button color="secondary" on:click={pop}>Go back</Button>
        </ModalFooter>
      </Modal>
    {/if}
  </User>
</FirebaseApp>

<style>
  #messages {
    padding-bottom: 10px;
    overflow-y: auto;
    flex: 1 1 auto;
    padding-right: 10px;
    padding-left: 10px;
  }

  #chat {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :global(.card-body) {
    padding: 0.75rem !important;
  }

  :global(.card) {
    border-radius: 1rem !important;
    
    margin-bottom: 1rem;
  }

  :global(#sendbox) {
    padding-top: 10px;
  }

  :global(.msg) {
    width: fit-content;
    max-width: 50%;
  }

  :global(html) {
    scroll-behavior: smooth;
  }
</style>