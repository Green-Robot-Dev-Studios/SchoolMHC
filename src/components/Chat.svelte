<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";

  import { Jumbotron, Button, Row, Card, Container, InputGroup, Input } from 'sveltestrap';

  import { strings } from "../locale"
  
  import { afterUpdate } from 'svelte';
  
  const firebaseConfig = {
    apiKey: "AIzaSyDpFJ1vMnojgESGXD-yjlQyIXU8GuJNQLA",
    authDomain: "csachat-9dff3.firebaseapp.com",
    databaseURL: "https://csachat-9dff3-default-rtdb.firebaseio.com",
    projectId: "csachat-9dff3",
    storageBucket: "csachat-9dff3.appspot.com",
    messagingSenderId: "384915371882",
    appId: "1:384915371882:web:2a14a7141b635d69381713"
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

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
  afterUpdate(() =>{
    if (scrollRef) {
      scrollRef.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  });
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
    <Doc path={`users/${user.uid}`} let:data={user} let:ref={userRef} log>
      <div slot="loading">Loading...</div>
      <!-- Creates account -->
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
        log>
      
        <div slot="loading">Loading...</div>
        <div slot="fallback">There was an error getting messages. Try refreshing.</div>

        <div id="messages" bind:this={scrollRef}>
          {#each messages as msg}
            <Card body>{msg.text}</Card>
          {/each}
        </div>

        <Container class="fixed-bottom">
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

      </Collection>
    </Doc>

  </User>
</FirebaseApp>

<style>
  #messages {
    padding-bottom: 50px;
  }
</style>