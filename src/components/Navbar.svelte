<!-- Renders a navbar at the top of the page -->

<script>
  import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
	} from "sveltestrap";

  import { Link } from "svelte-navigator";

  import { strings } from "../locale";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="primary" dark expand="md">
  <NavbarBrand href="/">{strings.navbar.title}</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <Link to="/" class="nav-link">{strings.navbar.home}</Link>
      </NavItem>
      <NavItem>
        <Link to="/chat" class="nav-link">{strings.navbar.chatNow}</Link>
      </NavItem>
      <NavItem>
        <Link to="/about" class="nav-link">{strings.navbar.aboutUs}</Link>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>
