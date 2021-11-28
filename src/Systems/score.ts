let score = 0
const scoreCanvas = new UICanvas()
const scoreText = new UIText(scoreCanvas)
scoreText.positionX = 300
scoreText.positionY = 200
scoreText.fontSize = 40

export function setScore(points: number):void
{
    score += points;
    scoreText.value = "Score: " + score.toString();
}
