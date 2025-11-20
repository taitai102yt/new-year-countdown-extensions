// =======================
// 干支リスト（子＝0）
// =======================
const etoList = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

function getEto(year) {
  // 2020 が子年 → 2020 - 4 = 2016 → 2016 % 12 = 0
  return etoList[(year - 4) % 12];
}

// =======================
// うるう年判定
// =======================
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// =======================
// カウントダウン計算
// =======================
function updateCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  const nextYear = year + 1;
  const newYear = new Date(nextYear, 0, 1, 0, 0, 0);

  let diff = newYear - now;

  // ★ 今年がうるう年 & まだ 2/29 が来ていない → 1日増やす
  if (isLeapYear(year)) {
    const feb29 = new Date(year, 1, 29);
    if (now < feb29) {
      diff += 24 * 60 * 60 * 1000;
      document.getElementById("leap-info").textContent = "今年はうるう年です（2/29 を含めて計算）";
    } else {
      document.getElementById("leap-info").textContent = "今年はうるう年です";
    }
  } else {
    document.getElementById("leap-info").textContent = "";
  }

  // ====== 各値に分解 ======
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  // ====== HTML に反映 ======
  document.getElementById("days").textContent = d;
  document.getElementById("hours").textContent = String(h).padStart(2, "0");
  document.getElementById("minutes").textContent = String(m).padStart(2, "0");
  document.getElementById("seconds").textContent = String(s).padStart(2, "0");

  // ====== 来年が表示される部分（あなたのHTML） ======
  const nextEto = getEto(nextYear);
  document.getElementById("next-year-info").textContent =
    `来年（${nextYear}年）は「${nextEto}年」です`;

  // ====== デバッグ・確認用 ======
  document.getElementById("target-datetime").textContent =
    `目標: ${newYear.toLocaleString()}`;
}

// =======================
// 更新ボタン
// =======================
document.getElementById("refresh").addEventListener("click", updateCountdown);

// =======================
// 毎秒更新
// =======================
updateCountdown();
setInterval(updateCountdown, 1000);
