<script>
    import RewardCard from "$lib/components/RewardCard.svelte";
    let { data } = $props();

    // TODO: Improve and add error handling
    let usedRewardPoints = $derived(
        data.user.rewards.reduce((sum, reward) => sum + reward.points, 0),
    );
    let availablePoints = $derived(data.totalRewardPoints - usedRewardPoints);

    let currentLevel = $derived.by(() => {
        let currentLevel = data.levels[0];
        for (const level of data.levels) {
            if (data.totalRewardPoints >= level.points_needed) {
                currentLevel = level;
            } else {
                break;
            }
        }
        return currentLevel;
    });

    // TODO: Improve and add error handling
    let nextLevel = $derived.by(() => {
        // Find the next level after current
        const currentIndex = data.levels.findIndex(
            (level) => level._id === currentLevel._id,
        );
        return currentIndex < data.levels.length - 1
            ? data.levels[currentIndex + 1]
            : null;
    });

    // TODO: Improve and add error handling
    let levelProgress = $derived.by(() => {
        const progress =
            (data.totalRewardPoints / nextLevel.points_needed) * 100;

        return Math.round(progress);
    });

    let pointsToNextLevel = $derived(nextLevel.points_needed - data.totalRewardPoints);
</script>

<div class="container-fluid">
    <div class="row">
        <div class="col-lg-12 py-4">
            <div class="text-center mb-4">
                <h1>Welcome back, {data.user.name}!</h1>
                <p>Du hast aktuell <strong>{availablePoints} Punkte</strong> für Rewards.</p>
            </div>
            <div class="level-card mb-5">
                <div class="level-card-body">
                    <div class="row align-items-center">
                        <div class="col-4 text-center">
                            <div class="level-title">{currentLevel.name}</div>
                            <div class="points-big">
                                {data.totalRewardPoints}
                            </div>
                            <div class="points-label">
                                Punkte seit Beginn
                            </div>
                        </div>
                        <div class="col-4 text-center">
                            <div class="progress-container">
                                <div class="progress">
                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        style="width: {levelProgress}%;"
                                        aria-valuenow={levelProgress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                            <div class="points-big">{pointsToNextLevel}</div>
                            <div class="points-label">Fehlende Punkte</div>
                        </div>
                        <div class="col-4 text-center">
                            <div class="level-title">{nextLevel.name}</div>
                            <div class="points-big">
                                {nextLevel.points_needed}
                            </div>
                            <div class="points-label">
                                Punkte für nächstes Level
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rewards Section -->
            <section class="rewards-section">
                <div class="row g-4">
                    {#each data.rewards as reward}
                        <div class="col-lg-4 col-md-6 col-12 d-flex">
                            <RewardCard {reward} {availablePoints}></RewardCard>
                        </div>
                    {/each}
                </div>
            </section>
        </div>
    </div>
</div>

<style>
    .level-card .level-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 16px;
    }
    .level-card .points-big {
        font-size: 32px;
        font-weight: 700;
    }
    .level-card .points-label {
        font-size: 14.4px;
    }
    .level-card .progress-container {
        margin: 24px 0;
    }
</style>
