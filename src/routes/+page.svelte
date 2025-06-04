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
        const currentIndex = data.levels.findIndex(level => level._id === currentLevel._id);
        return currentIndex < data.levels.length - 1 ? data.levels[currentIndex + 1] : null;
    })

    // TODO: Improve and add error handling
    let levelProgress = $derived.by(() => {
        const progress = (data.totalRewardPoints / nextLevel.points_needed) * 100;
        
        return Math.round(progress);
    })

    
</script>

<div class="container-fluid">
    <div class="row">
        <!-- Info sidebar -->
        <aside class="col-lg-3 sidebar py-4">
            <div class="mb-4">
                <div class="fw-bold text-uppercase mb-2">Welcome back</div>
                <div class="user-name">{data.user.name}</div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <div class="stat-number">{data.totalRewardPoints}</div>
                    <div class="stat-label">Your total Points</div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <div class="stat-number">{availablePoints}</div>
                    <div class="stat-label">Available Points Balance</div>
                </div>
            </div>

            <div class="mb-4">
                <h5>Your E-mail</h5>
                <div class="info-text">{data.user.email}</div>
                <h5>Your Info</h5>
                <!-- TODO: Make dynamic -->
                <address class="info-text mb-0">
                    Bergstrasse 37<br />
                    8708 Männedorf
                </address>
            </div>
        </aside>

        <!-- Level -->
        <main class="col-lg-9 py-4">
            <div class="level-card mb-5">
                <div class="level-card-body">
                    <div class="row align-items-center">
                        <div class="col-4 text-center">
                            <div class="level-title">{currentLevel.name}</div>
                            <div class="points-big">
                                {data.totalRewardPoints}
                            </div>
                            <div class="points-label">Your total Points</div>
                        </div>
                        <div class="col-4">
                            <!-- Progress Bar Container -->
                            <div class="progress-container">
                                <div class="progress">
                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        style="width: {levelProgress}%;"
                                        aria-valuenow="{levelProgress}"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 text-center">
                            <div class="level-title">{nextLevel.name}</div>
                            <div class="points-big">{nextLevel.points_needed}</div>
                            <div class="points-label">
                                Points for next level
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
                            <RewardCard {reward}></RewardCard>
                        </div>
                    {/each}
                </div>
            </section>
        </main>
    </div>
</div>

<style>
    .sidebar h5 {
        font-weight: 600;
        margin-top: 24px;
        margin-bottom: 8px;
        text-transform: uppercase;
        font-size: 14.4px;
        letter-spacing: 0.03em;
    }
    .sidebar .user-name {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 4px;
    }
    .sidebar .stat-number {
        font-size: 28px;
        font-weight: 700;
        margin-top: 4px;
        margin-bottom: 4px;
    }
    .sidebar .stat-label {
        font-size: 13.6px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
    .sidebar .info-text {
        font-size: 15.2px;
        line-height: 1.4;
    }

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
