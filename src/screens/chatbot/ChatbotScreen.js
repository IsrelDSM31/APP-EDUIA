import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { chatbotService } from '../../services/chatbotService';
import { colors, fontSize, fontWeight, spacing } from '../../theme';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: '¡Hola! 👋 Soy el asistente inteligente de EduIA.\n\nPuedo ayudarte con:\n📊 Estadísticas de estudiantes\n🎓 Información de calificaciones\n📅 Datos de asistencias\n🛡️ Análisis de riesgo\n🔔 Alertas del sistema\n\n¿Qué necesitas saber?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll al último mensaje
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await chatbotService.sendMessage(inputText.trim(), conversationId);
      
      if (!conversationId && response.data?.conversation_id) {
        setConversationId(response.data.conversation_id);
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response.data?.bot_response || 'Lo siento, no pude procesar tu mensaje.',
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: '❌ Lo siento, ocurrió un error. Por favor intenta de nuevo.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isBot ? styles.botMessageContainer : styles.userMessageContainer,
      ]}
    >
      {item.isBot && (
        <View style={styles.botAvatar}>
          <Icon name="robot" size={24} color={colors.textLight} />
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          item.isBot ? styles.botBubble : styles.userBubble,
        ]}
      >
        <Text style={[
          styles.messageText,
          item.isBot ? styles.botText : styles.userText,
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestamp,
          item.isBot ? styles.botTimestamp : styles.userTimestamp,
        ]}>
          {item.timestamp.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      {!item.isBot && (
        <View style={styles.userAvatar}>
          <Icon name="account" size={24} color={colors.textLight} />
        </View>
      )}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity
        style={styles.quickButton}
        onPress={() => setInputText('estadísticas')}
      >
        <Icon name="chart-bar" size={16} color={colors.primary} />
        <Text style={styles.quickButtonText}>Estadísticas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.quickButton}
        onPress={() => setInputText('riesgo')}
      >
        <Icon name="shield-alert" size={16} color={colors.error} />
        <Text style={styles.quickButtonText}>Riesgo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.quickButton}
        onPress={() => setInputText('ayuda')}
      >
        <Icon name="help-circle" size={16} color={colors.info} />
        <Text style={styles.quickButtonText}>Ayuda</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Icon name="robot" size={32} color={colors.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Asistente IA</Text>
          <Text style={styles.headerSubtitle}>EduIA Chatbot</Text>
        </View>
      </View>

      {renderQuickActions()}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe tu pregunta..."
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || loading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || loading}
        >
          {loading ? (
            <Icon name="loading" size={24} color={colors.textLight} />
          ) : (
            <Icon name="send" size={24} color={colors.textLight} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  quickActions: {
    flexDirection: 'row',
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  quickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  quickButtonText: {
    fontSize: fontSize.xs,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  messagesContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.info,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: spacing.md,
    borderRadius: 16,
  },
  botBubble: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: fontSize.md,
    lineHeight: 20,
  },
  botText: {
    color: colors.text,
  },
  userText: {
    color: colors.textLight,
  },
  timestamp: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  botTimestamp: {
    color: colors.textSecondary,
  },
  userTimestamp: {
    color: colors.textLight + 'CC',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
});

export default ChatbotScreen;


