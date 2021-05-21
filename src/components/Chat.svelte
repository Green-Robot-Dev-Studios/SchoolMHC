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

  import { pop, push, replace } from 'svelte-spa-router';
  
  import { tick } from 'svelte';

  export let params;
  console.log(params);

  // msgInput is synced to chat field's value
  // scrollRef is a reference to the chat
  let msgInput, scrollRef;

  let open = false;
  const toggle = () => (open = !open);

  // Sends message
  async function send(msg, ref, isAnon, userData, userRef) {
    if (msg === "") {
      return;
    }
    if (!userData.isChatting && !isAnon) {
      await userRef.update({
        isChatting: true
      });
    }
    ref.doc().set({
      person: isAnon ? 0 : 1,
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
    console.log("Leaving chat as anon")
    setTimeout(async ()=>{
      await signOut(auth);
      await push("/");
      console.log("Leaving")
    }, 3000);
  }

  async function endRoom(userRef) {
    await userRef.update({
      isFinished: true
    });
  }

  function roomEnded(userData, isAnon, auth) {
    if (userData?.isFinished) {
      toggle();
      if (isAnon) {
        leave(auth);
      }
    }
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
    {#if user.isAnonymous || params.u == 1}
      <Doc path={params.t ? `users/${params.t}` : `users/${user.uid}`} 
        let:data={userData} 
        let:ref={userRef} 
        on:data={(e)=>roomEnded(e.detail.data, user.isAnonymous, auth)}
        log>
        <!-- Firebase is still loading -->
        <div slot="loading">Loading...</div>

        <!-- Creates anon account -->
        <div slot="fallback">
          Creating account...
          {userRef.set({
            isFinished: false,
            isChatting: false,
            timeCreated: firebase.firestore.FieldValue.serverTimestamp() 
          })}
        </div>

        <!-- Conditionally render room end message -->
        <!-- Fade must be false due to component update cycle. TODO: better fix -->
        <Modal fade={false} isOpen={open} {toggle}>
          <ModalHeader>Warning!</ModalHeader>
          <ModalBody>
            This chat is finished. {user.isAnonymous ? "You are being redirected back." : ""}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" on:click={toggle}>Ok</Button>
          </ModalFooter>
        </Modal>
        
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
            <!-- Leave chat and end chat button -->
            <Container class="text-center">
              <Button color="danger" on:click={()=>params.u ? pop() : toggle() && leave(auth)}>Leave Chat</Button>
              {#if params.u == 1 && !userData.isFinished}
                <Button color="danger" on:click={()=>endRoom(userRef)}>End Chat</Button>
              {/if}
            </Container>

            <!-- Render message cards -->
            <div id="messages" bind:this={scrollRef}>
              {#each messages as msg}
                <Card style="
                  border-bottom-{msg.person==user.isAnonymous?'left':'right'}-radius: 0rem !important;
                  margin-left: {msg.person==user.isAnonymous?'0':'auto'};
                "
                color="{msg.person==user.isAnonymous?'primary':'secondary'}" 
                inverse 
                class="msg">
                  <CardBody>
                    {msg.text}
                  </CardBody>
                  <CardFooter>{msg.time ? msg.time.toDate().toLocaleTimeString() : '...'}</CardFooter>
                </Card>
              {/each}
            </div>

            <!-- Render message box -->
            <Container id="sendbox">
              <InputGroup>
                <Input 
                  on:keyup={e=>e.key==="Enter" && send(msgInput, messagesRef, user.isAnonymous, userData, userRef)} 
                  bind:value={msgInput} placeholder="Message">
                </Input>
                <div class="input-group-append">
                  <Button on:click={()=>send(msgInput, messagesRef, user.isAnonymous, userData, userRef)}>Send</Button>
                </div>
              </InputGroup>
            </Container>

          </div>
        </Collection>
      </Doc>
    {:else}
      <!-- Modal in the event of a logged in helper clicking chat now -->
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

  /* Fix utterly moronic code by bootstrap */
  :global(.modal-open) {
    overflow: unset !important;
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