<script>
  import Router from 'svelte-spa-router'
  import Home from './components/Home.svelte';
  import Chat from './components/Chat.svelte';
  import About from './components/About.svelte';
  import Navbar from "./components/Navbar.svelte";
  import NotFound from "./components/NotFound.svelte";

  const routes = {
    // Exact path
    '/': Home,

    // Using named parameters, with last being optional
    '/chat': Chat,

    // Wildcard parameter
    '/about': About,

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
  }
</script>



<nav>
  <Navbar/>
</nav>

<Router {routes}/>
