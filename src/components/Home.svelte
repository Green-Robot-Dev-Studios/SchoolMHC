<script>
  import { Button, Col, Jumbotron, Row } from 'sveltestrap';

  import { strings } from "../locale"
</script>

<Row>
  <Col class="d-none d-md-block">
    <img src="./chat-animate.svg" alt="People chatting"/>
  </Col>
  <Col>
    <Jumbotron>
      <h1>{strings.jumbo.jumbo}</h1>
      <h3>{@html strings.jumbo.jumboSub}</h3>
      <Button color="primary" on:click={()=>location.href = "#/chat"}>{strings.jumbo.chatNow}</Button>
    </Jumbotron>
  </Col>
</Row>
<Row>
  <div id="footer" class="text-center">
    © 2021 Copyright: GRDS
    <br>
    Illustrations by <a href="https://storyset.com/">Freepik Storyset</a>
  </div>
</Row>

<style>
  #footer {
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
  }

  :global(.row) {
    margin-right: 0px !important;
    margin-left: 0px !important;
  }

  :global(body) {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>