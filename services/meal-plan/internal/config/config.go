package config

import "os"

type Config struct {
	AppEnv      string
	ServiceName string
	Port        string
	DatabaseURL string
	RedisAddr   string
	RabbitMQURL string
}

func Load() Config {
	return Config{
		AppEnv:      getenv("APP_ENV", "local"),
		ServiceName: getenv("SERVICE_NAME", "meal-plan"),
		Port:        getenv("PORT", "8080"),
		DatabaseURL: os.Getenv("DATABASE_URL"),
		RedisAddr:   os.Getenv("REDIS_ADDR"),
		RabbitMQURL: os.Getenv("RABBITMQ_URL"),
	}
}

func getenv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
