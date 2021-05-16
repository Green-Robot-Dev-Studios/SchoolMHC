<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";

  import { Jumbotron, Button, Row } from 'sveltestrap';

  import { strings } from "../locale"

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
</script>

<FirebaseApp {firebase}>
  <User let:user let:auth>
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
  </User>
</FirebaseApp>