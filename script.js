document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");

  // Mesajı gizleme fonksiyonu
  const hideMessage = (messageElement) => {
      setTimeout(() => {
          messageElement.style.display = "none";
      }, 3000); // 3000 ms = 3 saniye
  };

  // Görev ekleme
  addTaskButton.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
          errorMessage.textContent = "Boş görev ekleyemezsiniz!";
          errorMessage.style.display = "block";
          successMessage.style.display = "none"; // Başarı mesajını gizle
          hideMessage(errorMessage); // Hata mesajını gizle
          return; // Boş görev eklenemez
      }

      errorMessage.style.display = "none"; // Hata mesajını gizle
      successMessage.textContent = "Görev başarıyla eklendi!";
      successMessage.style.display = "block"; // Başarı mesajını göster
      hideMessage(successMessage); // Başarı mesajını gizle

      const li = document.createElement("li");
      li.textContent = taskText;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Sil";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Sil butonuna tıklanırsa li'yi sil
          taskList.removeChild(li);
          successMessage.textContent = "Görev başarıyla silindi!";
          successMessage.style.display = "block"; // Silme mesajını göster
          hideMessage(successMessage); // Silme mesajını gizle
      });

      li.appendChild(deleteButton);
      li.addEventListener("click", () => {
          li.classList.toggle("completed"); // Görev tamamlandığında üstü çizilir ve onay işareti eklenir
      });

      taskList.appendChild(li);
      taskInput.value = ""; // Input alanını temizle
  });

  // Enter tuşuna basarak görev ekleme
  taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
          addTaskButton.click();
      }
  });
});
