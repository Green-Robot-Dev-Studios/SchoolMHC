<!-- Renders a navbar at the top of the page -->

<script>
  import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
    NavLink,
	} from "sveltestrap";

  import { strings } from "../locale";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="primary" dark expand="md" class="fixed-top">
  <NavbarBrand href="/">{strings.navbar.title}</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <NavLink href="#/">{strings.navbar.home}</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/chat">{strings.navbar.chatNow}</NavLink>
      </NavItem>
      <!-- To be implemented -->
      <!-- <NavItem>
        <NavLink href="#/about">{strings.navbar.aboutUs}</NavLink>
      </NavItem> -->
      <NavItem>
        <NavLink href="#/login">{strings.navbar.login}</NavLink>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>

<style>
  /* Fixes navbar hiding elements */
  /* Bootstrap docs recommend this :| */
  :global(body) {
    padding-top: 60px;
    overflow-x: hidden;
  }
</style>