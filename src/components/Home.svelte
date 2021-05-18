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