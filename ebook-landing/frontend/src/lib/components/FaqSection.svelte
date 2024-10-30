<script>
  import { Button, FaqItem } from "$components";
  import mastodonIcon from "$assets/icons/mastodon.svg";
</script>

<section class="faq-section">
  <h2 class="mb-l">Frequently Asked Questions</h2>
  <div class="faq-container">
    <FaqItem></FaqItem>
  </div>
  <div class="additional-info">
    <Button class="mt-s">BUY NOW</Button>
    <p class="mt-m">Any of other questions?</p>
    <a href="https://bolha.us/@rwallan">
      <p>
        Hit me up on Mastodon <img
          src={mastodonIcon}
          class="mastodon-icon"
          alt=""
        />
      </p>
    </a>
  </div>
</section>
