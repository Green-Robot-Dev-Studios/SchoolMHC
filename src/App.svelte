<script>
  import Router from 'svelte-spa-router'
  import Home from './components/Home.svelte';
  import Chat from './components/Chat.svelte';
  import About from './components/About.svelte';
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import Dash from "./components/Dash.svelte";
  import NotFound from "./components/NotFound.svelte";

  import firebase from "firebase/app";

  const routes = {
    // Exact path
    '/': Home,
    '/chat': Chat,
    '/about': About,
    '/login': Login,
    '/dash': Dash,

    // Catch-all
    '*': NotFound,
  }

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



<nav>
  <Navbar/>
</nav>

<Router {routes}/>
