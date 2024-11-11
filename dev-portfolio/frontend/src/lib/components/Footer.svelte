<script lang="ts">
  import mastodon from "$assets/mastodon.svg";
</script>

<footer class="footer">
  <div class="footer-container">
    <h3 class="semi-bold mb-xs">Richard Wallan</h3>
    <div class="mb-l">
      <a href="https://github.com/RWallan" target="_blank" class="footer-link"
        ><i class="devicon-github-original"></i></a
      >
      <a
        href="https://linkedin.com/in/richardwallan"
        target="_blank"
        class="footer-link"><i class="devicon-linkedin-plain"></i></a
      >
      <a href="https://bolha.us/@rwallan" target="_blank" class="footer-link">
        <img src={mastodon} alt="Mastodon" /></a
      >
    </div>
    <p>&copy; 2024 Richard Wallan. All rights reserved.</p>
  </div>
</footer>

<style>
  .footer {
    background-color: black;
    color: white;
    padding: 40px 20px;
    text-align: center;
  }

  .footer-link {
    margin: 0 10px;
  }
  a {
    position: relative;
  }

  a::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #8e2d55;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  a:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }

  img {
    width: 16px;
    height: 16px;
    background-color: white;
  }
</style>
