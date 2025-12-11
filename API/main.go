package main

import (
	"net/http"
	"sort"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Task struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Hours   int    `json:"hours"`
	Minutes int    `json:"minutes"`
	Seconds int    `json:"seconds"`
	Order   int    `json:"order"` 
}

var tasks = []Task{
	{
		ID:      "1",
		Title:   "Example Task",
		Hours:   0,
		Minutes: 1,
		Seconds: 30,
		Order:   0,
	},
}

func getTasks(c *gin.Context) {
	sort.Slice(tasks, func(i, j int) bool {
		return tasks[i].Order < tasks[j].Order
	})

	c.IndentedJSON(http.StatusOK, tasks)
}

func createTask(c *gin.Context) {
	var newTask Task

	if err := c.BindJSON(&newTask); err != nil {
		return
	}

	newTask.ID = uuid.NewString()
	newTask.Order = len(tasks)

	tasks = append(tasks, newTask)
	c.IndentedJSON(http.StatusCreated, newTask)
}

func updateTask(c *gin.Context) {
	id := c.Param("id")

	var updated Task
	if err := c.BindJSON(&updated); err != nil {
		return
	}

	for i := range tasks {
		if tasks[i].ID == id {
			updated.ID = id
			updated.Order = tasks[i].Order

			tasks[i] = updated
			c.IndentedJSON(http.StatusOK, updated)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "task not found"})
}

func deleteTask(c *gin.Context) {
	id := c.Param("id")

	for i := range tasks {
		if tasks[i].ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			c.IndentedJSON(http.StatusOK, gin.H{"status": "deleted"})
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "task not found"})
}

// reorder expects an array of { id: string, order: number }
func reorderTasks(c *gin.Context) {
	var incoming []Task
	if err := c.BindJSON(&incoming); err != nil {
		return
	}

	for _, inc := range incoming {
		for i := range tasks {
			if tasks[i].ID == inc.ID {
				tasks[i].Order = inc.Order
			}
		}
	}

	sort.Slice(tasks, func(i, j int) bool {
		return tasks[i].Order < tasks[j].Order
	})

	c.IndentedJSON(http.StatusOK, tasks)
}


func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "DELETE", "GET"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	router.GET("/tasks", getTasks)
	router.POST("/tasks", createTask)
	router.PUT("/tasks/:id", updateTask)
	router.DELETE("/tasks/:id", deleteTask)

	router.POST("/tasks/reorder", reorderTasks)

	router.Run("localhost:8080")
}