<script>
  let { reward, availablePoints } = $props();

  // just do alerts as a feedback. nothing fancy
  function alertRedeem() {
    alert(`Du hast ${reward.name} für ${reward.points} Punkte eingelöst!`);
  }
</script>

<div class="d-flex justify-content-center">
  <div class="card h-100 bg-transparent text-white border-secondary">
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <h5 class="card-title mb-0">{reward.name}</h5>
        <span class="badge text-dark">{reward.points} Punkte</span>
      </div>

      <p class="card-text text-light flex-grow-1">{reward.description}</p>

      <form method="POST" action="?/redeemReward" use:enhance>
        <input type="hidden" name="reward" value={JSON.stringify(reward)} />
        <button
          class="btn mt-auto w-100"
          disabled={reward.points > availablePoints}
          onclick={alertRedeem}
        >
          Redeem
        </button>
      </form>
    </div>
  </div>
</div>

<style>
  .badge {
    background-color: #e9d356;
  }
</style>
