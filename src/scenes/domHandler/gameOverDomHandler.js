import { capitalize } from '../../api/apiHelper';

function addToParent(parentNode, position, score, user) {
  const positionNode = document.createElement('div');
  const scoreNode = document.createElement('div');
  const userNode = document.createElement('div');

  positionNode.classList.add('score-position');
  scoreNode.classList.add('score-score');
  userNode.classList.add('score-name');

  positionNode.textContent = position;
  scoreNode.textContent = score;
  userNode.textContent = user;

  parentNode.appendChild(positionNode);
  parentNode.appendChild(scoreNode);
  parentNode.appendChild(userNode);
  return parentNode;
}

export function populateHighscores(node, scores) {
  node.textContent = '';
  scores.forEach((score, index) => {
    const parentNode = document.createElement('div');
    parentNode.classList.add('score-container');
    node.appendChild(
      addToParent(parentNode, index + 1, score.score, capitalize(score.user)),
    );
  });
}

export function setToNode(node, content) {
  node.innerHTML = content;
}
