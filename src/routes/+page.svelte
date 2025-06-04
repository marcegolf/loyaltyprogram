<script>
    import RewardCard from "$lib/components/RewardCard.svelte";
    let { data } = $props();

    // TODO: Improve and add error handling
    let used_points = $derived(
        data.user.rewards.reduce((sum, reward) => sum + reward.points, 0),
    );
    let available_points = $derived(data.total_points - used_points);

    let current_level = $derived.by(() => {
        let current = data.levels[0];
        for (const level of data.levels) {
            if (data.total_points >= level.points_needed) {
                current = level;
            } else {
                break;
            }
        }
        return current;
    });

    // TODO: Improve and add error handling
    let next_level = $derived.by(() => {
        // Find the next level after current
        const current_index = data.levels.findIndex(
            (level) => level._id === current_level._id,
        );
        return current_index < data.levels.length - 1
            ? data.levels[current_index + 1]
            : null;
    });

    // TODO: Improve and add error handling
    let level_progress = $derived.by(() => {
        const progress =
            (data.total_points / next_level.points_needed) * 100;

        return Math.round(progress);
    });

    let pointsToNextLevel = $derived(next_level.points_needed - data.total_points);
</script>

<div class="container-fluid">
    <div class="row">
        <div class="col-lg-12 py-4">
            <div class="text-center mb-4">
                <h1>Welcome back, {data.user.name}!</h1>
                <p>Du hast aktuell <strong>{available_points} Punkte</strong> für Rewards.</p>
            </div>
            <div class="level-card mb-5">
                <div class="level-card-body">
                    <div class="row align-items-center">
                        <div class="col-4 text-center">
                            <div class="level-title">{current_level.name}</div>
                            <div class="points-big">
                                {data.total_points}
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
                                        style="width: {level_progress}%;"
                                        aria-valuenow={level_progress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                            <div class="points-big">{pointsToNextLevel}</div>
                            <div class="points-label">Fehlende Punkte</div>
                        </div>
                        <div class="col-4 text-center">
                            <div class="level-title">{next_level.name}</div>
                            <div class="points-big">
                                {next_level.points_needed}
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
                            <RewardCard {reward} availablePoints={available_points}></RewardCard>
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
