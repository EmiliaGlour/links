document.addEventListener("DOMContentLoaded", function () {
    // Load existing bookmark lists from local storage
    loadBookmarkLists();

    // Handle form submission for adding new bookmark
    document.getElementById("bookmarkLists").addEventListener("submit", function (e) {
        e.preventDefault();
        addBookmark();
    });

    // Add event listener for adding new list button
    document.getElementById("addListBtn").addEventListener("click", function () {
        addNewList();
    });
});

function loadBookmarkLists() {
    const bookmarkLists = localStorage.getItem("bookmarkLists");
    if (bookmarkLists) {
        document.getElementById("bookmarkLists").innerHTML = bookmarkLists;
    }
}

function addBookmark() {
    const link = document.getElementById("linkInput").value;
    const title = document.getElementById("titleInput").value;

    const bookmarkItem = `<li><button class="hyperlink" onclick="window.open('${link}', '_blank');">${title}</button></li>`;
    document.getElementById("bookmarkList").innerHTML += bookmarkItem;

    // Save bookmark list to local storage
    localStorage.setItem("bookmarkList", document.getElementById("bookmarkList").innerHTML);

    // Clear input fields
    document.getElementById("linkInput").value = "";
    document.getElementById("titleInput").value = "";
}

function addNewList() {
    const listTitle = prompt("Enter the title for the new list:");
    if (listTitle) {
        const newList = document.createElement('div');
        newList.classList.add('bookmark-list');

        const titleElement = document.createElement('strong');
        titleElement.classList.add('list-title');
        titleElement.textContent = listTitle;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            // Implement edit functionality
            alert("Edit functionality for list title: " + listTitle);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            if (confirm("Are you sure you want to delete this list?")) {
                newList.remove();
                // Update local storage
                localStorage.setItem("bookmarkLists", document.getElementById("bookmarkLists").innerHTML);
            }
        };

        const list = document.createElement('ul');
        list.id = 'bookmarkList';

        newList.appendChild(titleElement);
        newList.appendChild(editButton);
        newList.appendChild(deleteButton);
        newList.appendChild(list);

        document.getElementById("bookmarkLists").appendChild(newList);
        // Update local storage
        localStorage.setItem("bookmarkLists", document.getElementById("bookmarkLists").innerHTML);
    }
}
