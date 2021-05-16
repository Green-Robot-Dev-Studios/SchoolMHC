<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Chat from './components/Chat.svelte';
  import Home from './components/Home.svelte';
  import Navbar from "./components/Navbar.svelte";
</script>


<Router>
  <nav>
    <Navbar/>
  </nav>
  <Route path="/">
    <Home/>
  </Route>
  <Route path="/chat">
    <Chat/>
  </Route>
  <Route path="/about">
    <h1>
      About Us
    </h1>
  </Route>
</Router>