<script>
  import { Button, Col, Jumbotron, Row, Container } from 'sveltestrap';

  import { strings } from "../locale"
</script>

<div class="swoosh">
  <Container class="px-4 px-sm-2">
    <Row>
      <Col class="align-self-center">
        <!-- Jumbotron -->
        <div class="py-3 py-sm-3 py-md-5">
          <h1>{strings.jumbo.jumbo}</h1>
          <h3>{@html strings.jumbo.jumboSub}</h3>
          <Button color="primary" on:click={()=>location.href = "#/chat"}>{strings.jumbo.chatNow}</Button>
        </div>
      </Col>
      <Col class="d-none d-md-block align-self-center" md="6" lg="4" xl="4">
        <img src="./chat-animate.svg" class="img-fluid" alt="People chatting"/>
      </Col>
    </Row>
  </Container>
</div>
<Container class="px-4 px-sm-2">
  <Row>
    <Col class="d-none d-md-block align-self-center" md="5" lg="3" xl="3">
      <img src="./nepean.png" class="img-fluid" alt="Nepean Logo"/>
    </Col>
    <Col class="align-self-center">
      <!-- Jumbotron -->
      <div class="py-3 py-sm-3 py-md-5">
        <h2>Got something on your mind? Need to talk? 💬</h2>
        <h4>Nepean students want to help: connect with peers now, confidentially and anonymously. 🥷</h4>
          <Button outline color="primary" on:click={()=>location.href = "#/chat"}>{strings.jumbo.chatNow}</Button>
      </div>
    </Col>
  </Row>
  <Row>
    <Col class="py-3 py-sm-3 py-md-4 align-self-center"><h2>This chat is intended for Nepean students and is monitored from 4pm to 10pm.</h2></Col>
    <Col class="d-none d-md-block align-self-center" md="5" lg="3" xl="3">
      <img src="./time-management-animate.svg" class="img-fluid" alt="Clock"/>
    </Col>
  </Row>
  <!-- <Row><Col class="py-3 py-sm-3 py-md-4"><h2>Who is this for?</h2></Col></Row> -->
  <Row>
    <Col class="d-none d-md-block align-self-center" md="5" lg="3" xl="3">
      <a href="https://kidshelpphone.ca/">
        <img src="./kids-help-phone-logo-en.svg" class="img-fluid" alt="Kids help phone logo"/>
      </a>
    </Col>
    <Col>
      <h2>If you are in distress, or need to talk urgently outside of these hours, please reach out to Kids Help Phone at 1-800-668-6868.</h2>
    </Col>
    <!-- <Col>
      <ul>
        <li><h4><strong>For </strong>Nepean students</h4></li>
        <li><h4><strong>Who </strong>have something on their mind</h4></li>
        <li><h4><strong>Need </strong>someone they can relate with to talk to</h4></li>
      </ul>
    </Col> -->
  </Row>
  
</Container>
<Row>
  <div id="footer" class="text-center">
    © 2021 Copyright GRDS
    <br>
    Illustrations by <a href="https://storyset.com/">Freepik Storyset</a>
  </div>
</Row>

<style>
  #footer {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    width: 100%;
  }

  :global(.row) {
    margin-right: 0px !important;
    margin-left: 0px !important;
  }

  :global(.swoosh) {
    background: linear-gradient(165deg, #f7f5fb 50%, #fff 50%);
  }

  :global(body) {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>