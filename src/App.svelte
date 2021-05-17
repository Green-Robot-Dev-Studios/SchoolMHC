<script>
  import Router from 'svelte-spa-router'
  import Home from './components/Home.svelte';
  import Chat from './components/Chat.svelte';
  import About from './components/About.svelte';
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import NotFound from "./components/NotFound.svelte";

  const routes = {
    // Exact path
    '/': Home,
    '/chat': Chat,
    '/about': About,
    '/login': Login,

    // Catch-all
    '*': NotFound,
  }
</script>



<nav>
  <Navbar/>
</nav>

<Router {routes}/>
