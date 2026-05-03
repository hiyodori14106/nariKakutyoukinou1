// ぼかしを解除する関数
function removeBlur(rootNode) {
  // 「⚠ 違反の可能性」を含む要素を探す
  const warningSpans = rootNode.querySelectorAll('span');
  warningSpans.forEach(span => {
    if (span.textContent.includes('⚠ 違反の可能性')) {
      
      // 1. 警告のオーバーレイ（黒い半透明の帯）を非表示にする
      const overlay = span.closest('.absolute.inset-0');
      if (overlay) {
        overlay.style.display = 'none';
      }
      
      // 2. ぼかしがかかっているテキストのぼかしを解除する
      const parent = span.closest('.relative.z-10');
      if (parent) {
        // filter: blur が設定されている要素を探す
        const blurredText = parent.querySelector('[style*="blur"]');
        if (blurredText) {
          blurredText.style.filter = 'none'; // ぼかし解除
          blurredText.style.userSelect = 'auto'; // テキスト選択を可能にする
        }
      }
    }
  });
}

// ページ読み込み時に既に表示されているメッセージのぼかしを解除
removeBlur(document.body);

// 新しくチャットが追加されたかを監視（MutationObserver）
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      // 新しく追加された要素に対してぼかし解除を実行
      if (node.nodeType === 1) { 
        removeBlur(node);
      }
    });
  });
});

// チャットエリア（または画面全体）の監視を開始
observer.observe(document.body, { childList: true, subtree: true });
